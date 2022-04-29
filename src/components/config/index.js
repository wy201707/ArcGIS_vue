const config = {
/*     options: {
        url: 'https://js.arcgis.com/4.18/init.js',
        css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
    }, */
     options : {
        url: 'https://js.arcgis.com/4.23/',
        css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css',
    },
    centerPoints:[
         {
           'LongHai': [117.81813,24.44658]
        },
        {
            'Wuhan':[114.02919,30.58203]
            /* {
                Longitude:114.02919,
                latitude:30.58203
            } */
        },
        {
            'HanZhong':[107.03194, 33.06784]
        }
    ]
       
        
    

};

export default config;