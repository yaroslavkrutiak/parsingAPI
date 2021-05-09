import {DynamicFactBlock, StaticFactBlock} from "./objects.js";
import {dynamicFact_api_url,staticFacts_api_url} from "./index.js";


//  { setContent: fn, setStaticContent: fn, executeError: fn, dynamicFact_api_url: string,staticFacts_api_url: string, DynamicFactBlock: class, StaticFactBlock: class, getResponse: fn}

export async function getResponse(api_url) {   // { getData: fn, response: promise }
    const response = await fetch(api_url);
    if (response.status >= 200 && response.status <= 299) {
        if (response.status !== 204)
            return async function getData() {   // {     }
                return await response.json();
            };
        throw new Error('204 No Content');
    }
    throw new Error('Such things happen. Contact admin :)');
}

export function setContent(){
    getResponse(dynamicFact_api_url)
        .then(json => {
            json().then(content => {
                const dynamicFactObject = new DynamicFactBlock(content);
                return dynamicFactObject.postContent();
            }).catch(e =>{ throw new Error(e) });
        }).then(()=>setStaticContent())
        .catch(e => executeError(e));
}

export function setStaticContent(){
    getResponse(staticFacts_api_url)
        .then(json => {
            json().then(content => {
                const staticFactObject = new StaticFactBlock(content);
                staticFactObject.postContent()
            }).catch(e =>{ throw new Error(e) })
        })
        .catch(e => executeError(e));
}

export function executeError(msg) {
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = null;
    body.innerHTML += `<li style="font-weight: 300;top: 50px">${msg}</li>`;
    console.error(msg);
}