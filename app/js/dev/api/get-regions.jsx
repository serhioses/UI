const VK_API_URL = 'https://api.vk.com/api.php?oauth=1&method=database.getRegions';

var apiObj = {
    getRegions: function (countryID) {
        var url = `${VK_API_URL}&country_id=${countryID}`;

        return $.ajax({
            url: url,
            dataType: 'jsonp',
            method: 'POST'
        });
    }
};

export default apiObj;