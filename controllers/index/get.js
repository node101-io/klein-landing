module.exports = (req, res) => {
  const projects = [
    'band-protocol',
    'celestia',
    'cosmos-hub',
    'juno',
    'omniflix',
    'osmosis',
    'shentu',
    'umee'
  ];

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
        description: res.__('We need a more decentralized and private world. Everyone should be able to have a node in every chain they like without the obligation to learn what a shell command is. Wizard helps you to run and control your own node without the need to have any technical skills. It supports you through each and every step of node management and gives you the chance to support the decentralization of the network, while having your privacy its top priority. Wizard does not ask, keep, save or share any kind of information related to you or your node. With Wizard, you can operate your own node in any chain you choose without writing a single line of code.'),
        image: '/img/meta/header.png',
        twitter: true
      }
    },
    projects
  });
};
