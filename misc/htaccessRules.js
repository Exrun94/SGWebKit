const trimNewlines = require('trim-newlines');

function defaultRules() {

    const rule = `
# BEGIN WordPress
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
# END WordPress`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function upgradeMixedContent() {

    const rule = `
<ifModule mod_headers.c>
Header always set Content-Security-Policy "upgrade-insecure-requests;"
</IfModule>`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function cors() {

    const rule = `
<FilesMatch ".(eot|otf|ttf|woff|woff2)">
Header always set Access-Control-Allow-Origin "*"
</FilesMatch>`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function wordpressTimeout() {

    const rule = `
<IfModule mod_dtimeout.c>
<Files ~ ".php">
SetEnvIf Request_URI "index.php" DynamicTimeout=300
SetEnvIf Request_URI "wp-admin/themes.php" DynamicTimeout=300
SetEnvIf Request_URI "wp-admin/admin-ajax.php" DynamicTimeout=300
SetEnvIf Request_URI "wp-admin/admin.php" DynamicTimeout=300
#SetEnvIf Request_URI "wp-cron.php" DynamicTimeout=300
</Files>
</IfModule>`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function othersTimeout() {

    const rule = `
<IfModule mod_dtimeout.c>
<Files ~ ".php">
SetEnvIf Request_URI "index.php" DynamicTimeout=300
</Files>
</IfModule>`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function wwwRedirect(domain) {

    const rule = `
RewriteEngine On
RewriteCond %{HTTP_HOST} ^${domain} [NC]
RewriteRule ^(.*)$ http://www.${domain}/$1 [L,R=301]`

    return rule.replace(/\r?\n|\r/g, '\r')
}

function non_wwwRedirect(domain) {

    const rule = `
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www.${domain} [NC]
RewriteRule ^(.*)$ http://${domain}/$1 [L,R=301]`

    return rule.replace(/\r?\n|\r/g, '\r')
}


module.exports = {
    defaultRules,
    upgradeMixedContent,
    cors,
    wordpressTimeout,
    othersTimeout,
    wwwRedirect,
    non_wwwRedirect
}