export const isMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent;
    return /android|iphone|ipad|ipod|windows phone|opera mini|iemobile|mobile/i.test(userAgent);
};
