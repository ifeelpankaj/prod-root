// // ScriptLoader.js

// let googleMapsLoaded = false;
// const GOOGLE_MAPS_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_KEY;
// const loadScript = (src) => {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.onload = () => resolve(script);
//         script.onerror = () => reject(new Error(`Script load error for ${src}`));
//         document.body.appendChild(script);
//     });
// };

// const loadScripts = async () => {
//     await loadScript('https://checkout.razorpay.com/v1/checkout.js');
//     // console.log('Razorpay script loaded')

//     await loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`);

//     // Set a flag when Google Maps is loaded
//     googleMapsLoaded = true;
// };

// const isGoogleMapsLoaded = () => googleMapsLoaded;

// export { loadScripts, isGoogleMapsLoaded };
// map.script.js
let googleMapsLoaded = false;
let googleMapsPromise = null;

const GOOGLE_MAPS_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_KEY;

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
};

const loadGoogleMaps = async () => {
    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`).then(() => {
        // Wait for Google Maps API to be fully available
        return new Promise((resolve) => {
            const checkGoogleMaps = () => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    googleMapsLoaded = true;
                    resolve();
                } else {
                    setTimeout(checkGoogleMaps, 50);
                }
            };
            checkGoogleMaps();
        });
    });

    return googleMapsPromise;
};

const loadScripts = async () => {
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    await loadGoogleMaps();
};

const isGoogleMapsLoaded = () => googleMapsLoaded;

export { loadScripts, isGoogleMapsLoaded, loadGoogleMaps };
