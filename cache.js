/**
 * @cache Used to cache the data from the db for faster and easier workflow
 */
(function() {
    let pages = [];
    let pagesData = [];
    /**
     * @getPages it returns all of the pages that are currently cached
     */
    function getPages() {
        return pages;
    }
    /**
     * @setPages it sets Pages to the cache
     */
    function setPages(newPages) {
        pages = newPages;
    }
    /**
     * @getPagesData it returns all of the pages data that is currently cached
     */
    function getPagesData() {
        return pagesData;
    }
    /**
     * @setPagesData it sets Pages data to the cache
     */
    function setPagesData(newPagesData) {
        pagesData = newPagesData;
    }

    module.exports = {
        getPages: getPages,
        setPages: setPages,
        getPagesData: getPagesData,
        setPagesData: setPagesData
    };
}());
