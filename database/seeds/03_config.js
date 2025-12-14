exports.seed = async function(knex) {
  // Delete all existing config entries
  await knex('config').del();

  // Insert single config entry
  await knex('config').insert([
    {
      web_name: 'Media School Web',
      web_icon: 'favico.png',
      web_logo: 'logo.png',
      updated_at: knex.fn.now(),
      updated_by: null
    }
  ]);
};
