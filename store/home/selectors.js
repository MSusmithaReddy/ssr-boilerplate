const getHomePageData = store => {
    return store.homeReducer.data.homePageData;
}

const getLoadingStatus = store => {
    return store.homeReducer.ui.loading;
}

export { getHomePageData, getLoadingStatus };