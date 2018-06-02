/**
 * Created by f.putra on 03/06/18.
 * ini cara export function dalam ES6/7/8 jadi lebih ramping seperti ini
 * dari pada memakai require akan menjadi lebih gendut ukuran filenya. pengaruh kepada besarnya apk / ipa
 */
export function onEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}