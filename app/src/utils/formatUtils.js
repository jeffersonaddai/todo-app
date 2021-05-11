module.exports = {
    formatDate: function(date){
        let month = date.getMonth();
        month = month < 10 ? "0" + month : month;
        return `${date.getFullYear()}-${month}-${date.getDate()}`
    }
}