interface URLSearchParameters {
    limitQuery?: number;
    offsetQuery?: number;
    searchQuery?: string;
    filterQuery?: number;
    sortQuery?: string;
}

enum UrlQueryKey {
    LIMIT = 'limit',
    OFFSET = 'offset',
    TITLE = 'title',
    CATEGORY_ID = 'categoryId',
    SORT_ORDER = 'sortOrder',
}

export const getURLSearchParameters = (parameters: URLSearchParameters): string => {
    const urlParameters = new URLSearchParams();

    if (parameters.limitQuery) {
        urlParameters.set(UrlQueryKey.LIMIT, parameters.limitQuery.toString());
    }

    if (parameters.offsetQuery != null) {
        urlParameters.set(UrlQueryKey.OFFSET, parameters.offsetQuery.toString());
    }

    if (parameters.searchQuery) {
        urlParameters.set(UrlQueryKey.TITLE, parameters.searchQuery);
    }

    if (parameters.filterQuery) {
        urlParameters.set(UrlQueryKey.CATEGORY_ID, parameters.filterQuery.toString());
    }

    if (parameters.sortQuery) {
        urlParameters.set(UrlQueryKey.SORT_ORDER, parameters.sortQuery);
    }

    return urlParameters.toString();
};
