const getHomePageData = store => {
    return store.homeReducer.data.homePageData;
}

export { getHomePageData };