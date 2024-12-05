const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

(async () => {
    const inquirer = (await import('inquirer')).default;
    
    async function downloadImage(url, filepath, proxy) {
        const writer = fs.createWriteStream(filepath);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            proxy: proxy ? { host: proxy.host, port: proxy.port } : false
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }

    async function scrapeDanbooru(tag, limit = 10, cooldown = 5000, proxy = null) {
        const url = `https://danbooru.donmai.us/posts?tags=${tag}`;
        
        try {
            const response = await axios.get(url, { proxy: proxy ? { host: proxy.host, port: proxy.port } : false });
            const html = response.data;
            const $ = cheerio.load(html);
            const images = $('article.post-preview').slice(0, limit);

            const imagesDir = path.join(__dirname, 'images');
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir);
            }

            for (let i = 0; i < images.length; i++) {
                const imgUrl = $(images[i]).find('img').attr('src');
                const imgName = path.basename(imgUrl);
                const imgPath = path.join(imagesDir, imgName);

                console.log(`Downloading Image ${i + 1}: ${imgUrl}`);
                await downloadImage(imgUrl, imgPath, proxy);
                console.log(`Image ${i + 1} saved as ${imgPath}`);

                await new Promise(resolve => setTimeout(resolve, cooldown));
            }
        } catch (error) {
            console.error('Failed to retrieve the page:', error);
        }
    }

    async function startScraping(tag, limit, cooldown, interval, proxy) {
        while (true) {
            await scrapeDanbooru(tag, limit, cooldown, proxy);
            console.log(`Waiting for ${interval / 1000} seconds before the next round...`);
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }

    async function main() {
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'explicit',
                message: 'Do you want to include explicit content?',
                default: false
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many images do you want to download?',
                default: 10,
                validate: value => !isNaN(value) && value > 0
            },
            {
                type: 'input',
                name: 'cooldown',
                message: 'Enter the cooldown time between downloads (in milliseconds):',
                default: 5000,
                validate: value => !isNaN(value) && value >= 0
            },
            {
                type: 'confirm',
                name: 'useProxy',
                message: 'Do you want to use a proxy?',
                default: false
            },
            {
                type: 'input',
                name: 'proxyHost',
                message: 'Enter the proxy host:',
                when: answers => answers.useProxy
            },
            {
                type: 'input',
                name: 'proxyPort',
                message: 'Enter the proxy port:',
                when: answers => answers.useProxy,
                validate: value => !isNaN(value) && value > 0
            }
        ]);

        const tag = answers.explicit ? 'rating:explicit' : 'rating:safe';
        const proxy = answers.useProxy ? { host: answers.proxyHost, port: parseInt(answers.proxyPort) } : null;

        startScraping(tag, parseInt(answers.quantity), parseInt(answers.cooldown), 60000, proxy);
    }

    main();
})();