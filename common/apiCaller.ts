import url from "url";

export const makeCall = (urlHref: string, params: Record<string, string> = {} , options = {}) => {
    const { pathname, query } = url.parse(urlHref, true);
    const queryParams = { ...params, ...query } as Record<string, string>;
    const urlQueryParams = new URLSearchParams(queryParams);
    const modifiedUrl = pathname ? `${pathname}?${urlQueryParams.toString()}` : "";
    return fetch(modifiedUrl, options);
};