export class DynamicFactBlock {
    constructor(content) {
        this.arr = [];
        if (content.hasOwnProperty('fact')) {
            this.arr.push({fact: content.fact})
        } else
            for (let i = 0; i < content.length; i++) {
                this.arr[i] = {
                    user: content[i].user,
                    text: content[i].text,
                    updatedAt: content[i].updatedAt.split('T').join('  '),
                };
            }
    }

    createElements() {
        this.html = ``;
        for (let i = 0; i < this.arr.length; i++) {
            this.html += `   
                <li id="dynamic" tabindex="-1" role="article" aria-setsize="10" aria-posinset="2">
                    <article>
                        <div>
                            <header><h3>Dynamic Fact: <a>${this.arr[i].fact}</a></h3></header>
                        </div>
                    </article>
                </li>`
        }
    }

    post() {
        const body = document.getElementsByTagName('body')[0];
        body.innerHTML += this.html;
    }

    postContent() {
        this.createElements();
        this.post();
        const successfulPromise = new Promise((resolve, reject) => {
                resolve('success');
        });
        return successfulPromise;
    }
}

export class StaticFactBlock extends DynamicFactBlock {
    constructor(content) {
        super(content);
        for (let i = 0; i < content.length; i++) {
            this.arr[i].source = content[i].source;
        }
    }

    createElements() {
        this.html = ``;
        for (let i = 0; i < this.arr.length; i++) {
            this.html += `
                <li id="static" tabindex="-1" role="article" aria-setsize="10" aria-posinset="2">
                    <article>
                        <div>
                         <div>
                              <div>Source: <a style="color: rgb(125, 56, 163);">${this.arr[i].source}_${this.arr[i].user}</a>
                               </div>
                         </div>
                            <header><h3>Fact: <a>${this.arr[i].text}</a></h3></header>
                        </div>
                        <div>Updated: <a style="font-weight: 400;">${this.arr[i].updatedAt}</a>
                        
                        </div>
                    </article>
                </li>`
        }
    }
}