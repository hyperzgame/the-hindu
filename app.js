
(function(){
  const { useMemo, useState, useEffect } = React;
  const { createRoot } = ReactDOM;
  const { HashRouter, Routes, Route, Link, NavLink, useParams, useLocation, useNavigate } = ReactRouterDOM;

  const imgFor = (seed, w=1200, h=630) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  const data = window.ARTICLES || [];

  function useQuery(){
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  function PrivacyModal({open, onClose, onAccept}){
    if(!open) return null;
    return (
      React.createElement('div',{className:'modal-backdrop', role:'dialog','aria-modal':'true'},
        React.createElement('div',{className:'modal'},
          React.createElement('header',null,[
            React.createElement('h3',{key:'t'},'Privacy Policy'),
            React.createElement('button',{className:'btn secondary', onClick:onClose, key:'x'},'Close')
          ]),
          React.createElement('div',{className:'content'},[
            React.createElement('p',{key:1},'This is a static student project. No real-time news, accounts, or tracking are provided. No cookies are set by default.'),
            React.createElement('p',{key:2},'We do not collect personal data. External links may have their own policies. Images come from public placeholder services (picsum.photos).'),
            React.createElement('p',{key:3},'By continuing, you acknowledge that this site is for demonstration only and content is not real-time.'),
            React.createElement('ul',{style:{margin:"10px 0 0 16px"}, key:'ul'},[
              React.createElement('li',{key:'a'},'No ads, analytics, or account systems.'),
              React.createElement('li',{key:'b'},'Static articles; informational only.'),
              React.createElement('li',{key:'c'},'Outbound links open in a new tab.'),
            ])
          ]),
          React.createElement('footer',null,[
            React.createElement('button',{className:'btn secondary', onClick:onClose, key:'c'},'Close'),
            React.createElement('button',{className:'btn', onClick:onAccept, key:'a'},'Accept')
          ])
        )
      )
    );
  }

  function Header(){
    const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"];
    const [open, setOpen] = useState(false);
    const [more, setMore] = useState(false);
    const primary = sections.slice(0,8);
    const overflow = sections.slice(8);
    return (
      React.createElement('header', {className:'header'},
        React.createElement('div',{className:'container bar'},
          React.createElement(Link, {className:'brand', to:'/'}, [
            React.createElement('img',{className:'logo', src:'./logo.svg', alt:'The Times Express logo', key:'logo'}),
            React.createElement('div',{className:'name', key:'name'}, 'The Times Express')
          ]),
          React.createElement('nav',{className:'nav nav-desktop','aria-label':'Primary'},
            primary.map(s => React.createElement(NavLink, {key:s, to:`/section/${s.toLowerCase()}`, className:({isActive})=> isActive ? 'active': ''}, s)),
            React.createElement('div',{className:'dropdown', onMouseLeave:()=>setMore(false)},
              React.createElement('button',{className:'btn btn-ghost', onMouseEnter:()=>setMore(true), onClick:()=>setMore(v=>!v)}, 'More ▾'),
              more && React.createElement('div',{className:'menu'},
                overflow.map(s => React.createElement(NavLink, {key:s, to:`/section/${s.toLowerCase()}`, className:({isActive})=> isActive ? 'active': ''}, s))
              )
            )
          ),
          React.createElement('div',{className:'controls'},
            React.createElement(Link,{className:'btn', to:'/search'}, 'Search'),
            React.createElement('button',{className:'btn btn-ghost nav-toggle', onClick:()=>setOpen(v=>!v), 'aria-label':'Open menu'}, '☰')
          )
        ),
        open && React.createElement('div',{className:'nav-mobile container'},
          sections.map(s => React.createElement(NavLink,{key:s, to:`/section/${s.toLowerCase()}`, onClick:()=>setOpen(false), className:({isActive})=> isActive ? 'active': ''}, s)),
          React.createElement(Link,{className:'btn', to:'/search', onClick:()=>setOpen(false)}, 'Search')
        )
      )
    );
  }

  function Footer(){
    const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"];
    const year = new Date().getFullYear();
    return (
      React.createElement('div',{className:'footer'},
        React.createElement('div',{className:'container wrap'},
          React.createElement('div',null,[
            React.createElement('h4',{key:'h4'},'About'),
            React.createElement('p',{className:'meta', style:{marginTop:8}, key:'p'}, React.createElement('strong',null,'The Times Express'), ' is a student-built, static news portal made for an academic project.'),
            React.createElement('div',{className:'notice', style:{marginTop:10}, key:'n'}, 'This information is not real-time; only static news are presented here.')
          ]),
          React.createElement('div',null,[
            React.createElement('h4',{key:'h4'},'Sections'),
            React.createElement('ul',null, sections.map(s => React.createElement('li',{key:s}, React.createElement(Link,{to:`/section/${s.toLowerCase()}`}, s))))
          ]),
          React.createElement('div',null,[
            React.createElement('h4',{key:'h4'},'Links'),
            React.createElement('ul',null,[
              React.createElement('li',{key:'a'}, React.createElement(Link,{to:'/about'},'About')),
              React.createElement('li',{key:'b'}, React.createElement(Link,{to:'/contact'},'Contact')),
              React.createElement('li',{key:'c'}, React.createElement(Link,{to:'/privacy?popup=1'},'Privacy')),
              React.createElement('li',{key:'d'}, React.createElement(Link,{to:'/terms'},'Terms')),
              React.createElement('li',{key:'e'}, React.createElement(Link,{to:'/sitemap'},'Sitemap'))
            ])
          ])
        ),
        React.createElement('div',{className:'copy'}, `© ${year} The Times Express. Educational project. No affiliation with other news brands.`)
      )
    );
  }

  function Card({article}){
    return React.createElement(ReactRouterDOM.Link,{className:'card', to:`/article/${article.id}`},
      React.createElement('img',{loading:'lazy', src:imgFor(article.id), alt:`${article.section} photo`, onError:(e)=>{e.currentTarget.src=imgFor(article.id)}}),
      React.createElement('div',{className:'pad'},
        React.createElement('span',{className:'tag'}, article.section),
        React.createElement('div',{className:'title'}, article.title),
        React.createElement('div',{className:'meta'}, `${article.date} · ${article.readingMin} min read`)
      )
    );
  }

  function Home(){
    const featured = data.slice(0,6);
    const more = data.slice(6,18);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    return React.createElement('div',null,[
      React.createElement(PrivacyModal,{
        key:'pm', open:show,
        onClose:()=>{ setShow(false); navigate('/privacy'); },
        onAccept:()=>{ setShow(false); navigate('/privacy'); }
      }),
      React.createElement('div',{className:'hero'}, [
        React.createElement('div',{className:'grid', key:'l'}, featured.slice(0,3).map(a => React.createElement(Card,{key:a.id, article:a}))),
        React.createElement('div',{className:'grid', key:'r'}, featured.slice(3).map(a => React.createElement(Card,{key:a.id, article:a})))
      ]),
      React.createElement('div',{className:'section-head'},[
        React.createElement('h2',{key:'h'},'Latest stories'),
        React.createElement(ReactRouterDOM.Link,{className:'btn', to:'/sitemap', key:'b'}, 'Browse all')
      ]),
      React.createElement('div',{className:'grid'}, more.map(a => React.createElement(Card,{key:a.id, article:a})))
    ]);
  }

  function Section(){
    const params = useParams();
    const list = data.filter(a => a.section.toLowerCase() === params.sectionSlug);
    const name = params.sectionSlug[0].toUpperCase() + params.sectionSlug.slice(1);
    return React.createElement('div',null,[
      React.createElement('div',{className:'section-head'},[
        React.createElement('h2',{key:'h'}, name),
        React.createElement('div',{className:'meta', key:'m'}, `${list.length} articles`)
      ]),
      React.createElement('div',{className:'list'}, list.map(a => React.createElement(Card,{key:a.id, article:a})))
    ]);
  }

  function Article(){
    const { id } = useParams();
    const a = data.find(x => x.id === id);
    if(!a) return React.createElement('p',null,'Article not found.');
    return React.createElement('div',null,[
      React.createElement('div',{className:'breadcrumbs', style:{margin:'12px 0'}}, [
        React.createElement(ReactRouterDOM.Link,{to:'/'},'Home'),' › ',
        React.createElement(ReactRouterDOM.Link,{to:`/section/${a.section.toLowerCase()}`}, a.section)
      ]),
      React.createElement('article',{className:'article'},
        React.createElement('header',null,[
          React.createElement('h1',null,a.title),
          React.createElement('div',{className:'byline'}, `By ${a.author} · ${a.date} · ${a.readingMin} min read · `, React.createElement('span',{className:'tag'}, a.tag))
        ]),
        React.createElement('figure',null,[
          React.createElement('img',{loading:'lazy', src:imgFor(a.id), alt:`${a.section} photo`, onError:(e)=>{e.currentTarget.src=imgFor(a.id)}}),
          React.createElement('figcaption',{className:'meta', style:{padding:'8px 14px'}}, 'Image is a placeholder rectangle for coursework. Replace with your own media.')
        ]),
        React.createElement('div',{className:'prose'}, a.body.map((p,i)=> React.createElement('p',{key:i}, p))),
        React.createElement('div',{className:'share', style:{display:'flex',gap:10,margin:'10px 0'}},[
          React.createElement('a',{className:'btn', href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title)}`, rel:'noopener'}, 'Share'),
          React.createElement(ReactRouterDOM.Link,{className:'btn', to:`/section/${a.section.toLowerCase()}`}, `Back to ${a.section}`)
        ])
      )
    ]);
  }

  function Search(){
    const [q, setQ] = useState('');
    const [focus, setFocus] = useState(false);
    const uniq = (arr) => Array.from(new Set(arr));
    const titles = useMemo(()=>data.map(a=>a.title),[]);
    const sections = useMemo(()=>uniq(data.map(a=>a.section)),[]);
    const tags = useMemo(()=>uniq(data.map(a=>a.tag)),[]);

    const suggestions = useMemo(()=>{
      const s = q.trim().toLowerCase();
      const pool = [
        ...titles.map(t=>({type:'Title', value:t})),
        ...sections.map(t=>({type:'Section', value:t})),
        ...tags.map(t=>({type:'Tag', value:t}))
      ];
      if(!s){
        const rec = ['India','World','Technology','Health','Sports','Education','AI','Climate'];
        return rec.map(v=>({type: v.length>3?'Explore':'Tag', value: v}));
      }
      return pool.filter(x=>x.value.toLowerCase().includes(s)).slice(0,8);
    },[q,titles,sections,tags]);

    const results = useMemo(()=>{
      const s = q.trim().toLowerCase();
      if(!s) return data.slice(0,30);
      return data.filter(a =>
        a.title.toLowerCase().includes(s) ||
        a.section.toLowerCase().includes(s) ||
        a.tag.toLowerCase().includes(s)
      ).slice(0,60);
    },[q]);

    return React.createElement('div',{style:{position:'relative'}},[
      React.createElement('h1',{key:'h'},'Search'),
      React.createElement('input',{
        key:'i', value:q, onChange:e=>setQ(e.target.value),
        onFocus:()=>setFocus(true), onBlur:()=>setTimeout(()=>setFocus(false),150),
        placeholder:'Search articles, sections, or tags…', 'aria-label':'Search input',
        className:'btn', style:{width:'100%', padding:12, fontSize:'1rem', margin:'10px 0 14px'}
      }),
      focus && suggestions.length>0 && React.createElement('div',{className:'suggestions', key:'s'},
        suggestions.map((sug,i)=> React.createElement('button',{key:i, className:'suggestion', onMouseDown:()=>setQ(sug.value)},
          React.createElement('span',{className:'pill'},sug.type),' ',sug.value))
      ),
      React.createElement('div',{className:'grid', key:'g'}, results.map(a=> React.createElement(Card,{key:a.id, article:a})))
    ]);
  }

  function About(){
    return React.createElement('div',null,[
      React.createElement('h1',null,'About'),
      React.createElement('p',{className:'meta', style:{margin:'6px 0 14px'}}, 'What is this project?'),
      React.createElement('p',null,'This website is an educational, static news portal built for a college project. It is titled ', React.createElement('strong',null,'The Times Express'), ' and is not affiliated with any existing news organisation.'),
      React.createElement('p',null,'All content is static and for demonstration; this information is not real-time.')
    ]);
  }
  const Contact = ()=>React.createElement('div',null,[React.createElement('h1',null,'Contact'),
    React.createElement('p',{className:'meta', style:{margin:'6px 0 14px'}},'Get in touch for coursework queries.'),
    React.createElement('p',null,'Email: example@times-express.edu • Address: Your Campus • Phone: 00000-00000'),
    React.createElement('p',{className:'notice'},'These are placeholder details for the project.')
  ]);
  const Privacy = ()=>React.createElement('div',null,[React.createElement('h1',null,'Privacy Policy'),
    React.createElement('p',null,'This is a static, non-commercial student project. No tracking cookies or analytics are included by default.'),
    React.createElement('ul',{style:{margin:'10px 0 0 16px'}},[React.createElement('li',{key:1},'No personal data is collected.'),React.createElement('li',{key:2},'No third-party ads.'),React.createElement('li',{key:3},'Links may lead to external sites with their own policies.')])
  ]);
  const Terms = ()=>React.createElement('div',null,[React.createElement('h1',null,'Terms of Use'),
    React.createElement('p',null,'For educational demonstration only. Content is placeholder text and not factual reporting. Do not rely on it for decisions.'),
    React.createElement('p',null,'By using this site, you agree that this project is not affiliated with any news publisher and does not reproduce their proprietary content or branding.')
  ]);

  function Lander(){
    const [show, setShow] = useState(true);
    return React.createElement('div',null,[
      React.createElement(PrivacyModal,{
        key:'pm', open:show,
        onClose:()=>{ window.location.href = 'https://www.google.com'; },
        onAccept:()=>{ window.location.href = 'https://www.google.com'; }
      }),
      React.createElement('img',{src: imgFor('lander-unique'), alt:'Lander image', style:{width:'100%',height:'420px',objectFit:'cover',borderRadius:'16px',border:'1px solid var(--border)',margin:'16px 0'}}),
      React.createElement('p',null,'This is a hidden landing page. It only appears in the sitemap.')
    ]);
  }

  function Sitemap(){
    const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"];
    return React.createElement('div',null,[
      React.createElement('h1',null,'Sitemap'),
      React.createElement('ul',{style:{margin:'10px 0 0 16px'}},
        [].concat(
          [['Home','/'],['About','/about'],['Contact','/contact'],['Privacy','/privacy'],['Terms','/terms'],['Search','/search'],['Lander','/lander']].map(([n,p])=> React.createElement('li',{key:n}, React.createElement(ReactRouterDOM.Link,{to:p}, n))),
          sections.map(s => React.createElement('li',{key:s}, React.createElement(ReactRouterDOM.Link,{to:`/section/${s.toLowerCase()}`}, `${s} section`))),
          data.map(a => React.createElement('li',{key:a.id}, React.createElement(ReactRouterDOM.Link,{to:`/article/${a.id}`}, a.title)))
        )
      )
    ]);
  }

  function PrivacyModalGate(){
    const location = useLocation();
    const query = useQuery();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
      if (query.get('popup') === '1') setOpen(true);
      else setOpen(false);
    }, [location.search]);
    const navigate = useNavigate();
    return React.createElement(PrivacyModal, {
      open,
      onClose: ()=>{ navigate(location.pathname); },
      onAccept: ()=>{ navigate(location.pathname); }
    });
  }

  function App(){
    return React.createElement('div',null,[
      React.createElement(Header,{key:'h'}),
      React.createElement(PrivacyModalGate,{key:'pg'}),
      React.createElement('main',{className:'container', key:'m'},
        React.createElement(Routes,null,[
          React.createElement(Route,{path:'/', element:React.createElement(Home,null), key:'r0'}),
          React.createElement(Route,{path:'/section/:sectionSlug', element:React.createElement(Section,null), key:'r1'}),
          React.createElement(Route,{path:'/article/:id', element:React.createElement(Article,null), key:'r2'}),
          React.createElement(Route,{path:'/search', element:React.createElement(Search,null), key:'r3'}),
          React.createElement(Route,{path:'/about', element:React.createElement(About,null), key:'r4'}),
          React.createElement(Route,{path:'/contact', element:React.createElement(Contact,null), key:'r5'}),
          React.createElement(Route,{path:'/privacy', element:React.createElement(Privacy,null), key:'r6'}),
          React.createElement(Route,{path:'/terms', element:React.createElement(Terms,null), key:'r7'}),
          React.createElement(Route,{path:'/sitemap', element:React.createElement(Sitemap,null), key:'r8'}),
          React.createElement(Route,{path:'/lander', element:React.createElement(Lander,null), key:'r9'})
        ])
      ),
      React.createElement(Footer,{key:'f'})
    ]);
  }

  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(HashRouter,null, React.createElement(App,null)));
})();
