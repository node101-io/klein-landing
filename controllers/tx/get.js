module.exports = (req, res) => {
  return res.render('tx/index', {
    page: 'tx/index',
    title: res.__('TX'),
    includes: {
      external: {
        css: ['general', 'page'],
        css: ['general'],
        js: ['ancestorWithClassName', 'page', 'serverRequest']
      },
    }
  });
};
