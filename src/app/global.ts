// ===== File globals.ts
// usage: import { GlobalVariable } from './path/global';
//          console.log(GlobalVariable.BASE_API_URL);
'use strict';

import { Headers } from '@angular/http';

export const Global = Object.freeze({
    version: '0.01',
    BASE_API_URL: 'http://localhost:4200/api/',
    HEADER : { 
        headers: new Headers({ 
            'Content-Type': 'application/json',  
            withCredentials: true
        })
    }
 });

