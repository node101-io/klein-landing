const fetch = require('node-fetch');

const formatOS = os => {
  if (os.toLowerCase().includes('macintosh'))
    return 'mac';
  else if (os.toLowerCase().includes('windows'))
    return 'windows';
  else
    return 'linux';
};

module.exports = (req, res) => {
  const projects = [
    'andromeda',
    'archway',
    'babylon',
    'band-protocol',
    'celestia',
    'cosmos-hub',
    'dymension',
    'evmos',
    'juno',
    'lava',
    'neutron',
    'nibiru',
    'noble',
    'okp4',
    'omniflix',
    'osmosis',
    'shentu',
    'umee'
  ];

  fetch('https://admin.node101.io/api/wizard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const os = formatOS(req.headers['user-agent'].match(/(?<=\().*?(?=;)/)[0]);

      return res.render('index/index', {
        page: 'index/index',
        title: res.__('Run your Node, Support the Decentralization, Increase your Privacy'),
        includes: {
          external: {
            css: ['general', 'page'],
            js: ['ancestorWithClassName', 'page', 'serverRequest']
          },
          meta: {
            title: res.__('Run your Node, Support the Decentralization, Increase your Privacy'),
            description: res.__('Klein helps you install, run, and control your node without needing technical skills as a public good product. Klein helps you install any testnet or mainnet node on Cosmos Hub and Cosmos App Chains. Everyone should be able to have a node in every chain they like without the obligation to learn what a shell command is. Klein supports you through every step of node management and gives you the chance to support the decentralization of the network while making your privacy its top priority. Klein does not ask, keep, save, or share any kind of information related to you or your node. With Klein, you can operate your own node in any chain you choose without writing a single line of code. As a public good product, Klein is entirely free and supports decentralization by eliminating the technical barriers between people and the blockchain validating process.'),
            image: '/img/meta/header.png',
            twitter: true
          }
        },
        os,
        download_links: {
          mac: data.platforms['darwin-x86_64'].url,
          linux: data.platforms['linux-x86_64'].url,
          windows: data.platforms['windows-x86_64'].url
        },
        projects
      });
    })
    .catch((err) => {
      console.log(err)
      return res.render('index/index', {
        page: 'index/index',
        title: res.__('Run your Node, Support the Decentralization, Increase your Privacy'),
        includes: {
          external: {
            css: ['general', 'page'],
            js: ['ancestorWithClassName', 'page', 'serverRequest']
          },
          meta: {
            title: res.__('Run your Node, Support the Decentralization, Increase your Privacy'),
            description: res.__('Klein helps you install, run, and control your node without needing technical skills as a public good product. Klein helps you install any testnet or mainnet node on Cosmos Hub and Cosmos App Chains. Everyone should be able to have a node in every chain they like without the obligation to learn what a shell command is. Klein supports you through every step of node management and gives you the chance to support the decentralization of the network while making your privacy its top priority. Klein does not ask, keep, save, or share any kind of information related to you or your node. With Klein, you can operate your own node in any chain you choose without writing a single line of code. As a public good product, Klein is entirely free and supports decentralization by eliminating the technical barriers between people and the blockchain validating process.'),
            image: '/img/meta/header.png',
            twitter: true
          }
        },
        projects
      });
    });
};
