#! /usr/bin/env node

var request = require('request');
var cio = require('cheerio');
var colors = require('colors');
var url = require('url');
var webSiteUrlPrefix = 'http://www.biquge.tw';
var webSiteUrl = 'http://www.biquge.tw/0_680/';

request(webSiteUrl, function(err, res, body) {
    if (!err && res.statusCode == 200) {

        var $ = cio.load(body);
        var target = $('div#list dd:last-of-type');
        //通过CSS selector来筛选数据
        var src = target.children('a').attr('href');
        var pageTitle = target.text();
        var contentsUrl = webSiteUrlPrefix + src;
        request(contentsUrl, function(err, res, body) {
            if (err) {
                return;
            } else {
                if (res.statusCode == 200) {
                    var $ = cio.load(body);
                    var pageContents = $('div#content').text().replace(/\s+/g, '\n    ');
                    console.log(pageTitle.green + '\n\n' + pageContents.yellow);
                } else {
                    return;
                }
            }
        })
    } else {
        console.log('bad request');
    }
});
