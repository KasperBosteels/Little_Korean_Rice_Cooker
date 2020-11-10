// Importing my unborn children //
const resolve = require('../lib/resolve.js');

// Create Module //
module.exports = {

    // SFW //
    neko: function () { // Returns Safe for Work Neko Images! //

        return resolve.get('neko');

    },
    lewdNeko: function () { // Returns you lewd ... and dirty ... Neko Images ! //

        return resolve.get('lewdneko');

    },
    lewdBomb: async function () {

        // Thanks to @HanBao#8443 for this function! //
        const params = ["lewdneko", 'ass', 'maid', 'cum', 'bdsm'];
        let arr = await Promise.all(params.map(p => resolve.get(p)));
        let str = arr.join(" ");

        return str;

    },
    wallpapers: function () { // Returns you SFW Anime Wallpapers for Desktops ! //

        return resolve.get('wallpapers');

    },
    mobileWallpapers: function () { // Returns SFW Anime Wallpapers for Mobile Users ! //

        return resolve.get('mobileWallpapers');

    },
    nsfw: {
        ass: function () {
            return resolve.get('ass')
        },
        bdsm: function () {
            return resolve.get('bdsm')
        },
        cum: function () {
            return resolve.get('cum')
        },
        doujin: function () {
            return resolve.get('doujin')
        },
        femdom: function () {
            return resolve.get('femdom')
        },
        hentai: function () {
            return resolve.get('hentai')
        },
        maid: function () {
            return resolve.get('maid')
        },
        maids: function () {
            return resolve.get('maids')
        },
        orgy: function () {
            return resolve.get('orgy')
        },
        panties: function () {
            return resolve.get('panties')
        },
        wallpapers: function () {
            return resolve.get('nsfwwallpapers')
        },
        mobileWallpapers: function () {
            return resolve.get('nsfwmobilewallpapers')
        },
        cuckold: function () {
            return resolve.get('netorare')
        },
        netorare: function () {
            return resolve.get('netorare')
        },
        gifs: function () {
            return resolve.get('gif')
        },
        gif: function () {
            return resolve.get('gif')
        },
        blowjob: function () {
            return resolve.get('blowjob')
        },
        feet: function () {
            return resolve.get('feet')
        },
        pussy: function () {
            return resolve.get('pussy')
        },
        uglyBastard: function () {
            return resolve.get('uglybastard')
        },
        uniform: function () {
            return resolve.get('uniform')
        },
        gangbang: function () {
            return resolve.get('gangbang')
        },
        foxgirl: function () {
            return resolve.get('foxgirl')
        },
        cumslut: function () {
            return resolve.get('cumslut')
        },
        glasses: function () {
            return resolve.get('glasses')
        },
        thighs: function () {
            return resolve.get('thighs')
        },
        tentacles: function () {
            return resolve.get('tentacles')
        },
        masturbation: function () {
            return resolve.get('masturbation')
        }
    }

}