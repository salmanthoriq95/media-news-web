import db from '../../utils/db.js';

/**
 * Article Repository - Data Access Layer untuk Article Module
 */
export default {
  /**
   * Get all articles with pagination
   */
  async getAllArticles(limit = 10, offset = 0) {
    try {
      return await db('articles')
        .select(
          'articles.article_id',
          'articles.title',
          'articles.subtitle',
          'articles.content',
          'articles.image',
          'articles.created_at',
          'articles.updated_at',
          'creator.name as created_by_name',
          'updater.name as updated_by_name'
        )
        .leftJoin('users as creator', 'articles.created_by', 'creator.user_id')
        .leftJoin('users as updater', 'articles.updated_by', 'updater.user_id')
        .orderBy('articles.created_at', 'desc')
        .limit(limit)
        .offset(offset);
    } catch (error) {
      console.error('[ArticleRepository] Error in getAllArticles:', error);
      throw error;
    }
  },

  /**
   * Get latest articles (for homepage)
   */
  async getLatestArticles(limit = 6) {
    try {
      return await db('articles')
        .select(
          'articles.article_id',
          'articles.title',
          'articles.subtitle',
          'articles.image',
          'articles.created_at',
          'creator.name as created_by_name'
        )
        .leftJoin('users as creator', 'articles.created_by', 'creator.user_id')
        .orderBy('articles.created_at', 'desc')
        .limit(limit);
    } catch (error) {
      console.error('[ArticleRepository] Error in getLatestArticles:', error);
      throw error;
    }
  },

  /**
   * Get article by ID
   */
  async getArticleById(articleId) {
    try {
      return await db('articles')
        .select(
          'articles.*',
          'creator.name as created_by_name',
          'updater.name as updated_by_name'
        )
        .leftJoin('users as creator', 'articles.created_by', 'creator.user_id')
        .leftJoin('users as updater', 'articles.updated_by', 'updater.user_id')
        .where('articles.article_id', articleId)
        .first();
    } catch (error) {
      console.error('[ArticleRepository] Error in getArticleById:', error);
      throw error;
    }
  },

  /**
   * Create new article
   */
  async createArticle(articleData, userId) {
    try {
      const [articleId] = await db('articles').insert({
        ...articleData,
        created_by: userId,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      });

      return articleId;
    } catch (error) {
      console.error('[ArticleRepository] Error in createArticle:', error);
      throw error;
    }
  },

  /**
   * Update article
   */
  async updateArticle(articleId, articleData, userId) {
    try {
      const result = await db('articles')
        .where({ article_id: articleId })
        .update({
          ...articleData,
          updated_by: userId,
          updated_at: db.fn.now()
        });

      return result > 0;
    } catch (error) {
      console.error('[ArticleRepository] Error in updateArticle:', error);
      throw error;
    }
  },

  /**
   * Delete article (hard delete)
   */
  async deleteArticle(articleId) {
    try {
      const result = await db('articles')
        .where({ article_id: articleId })
        .delete();

      return result > 0;
    } catch (error) {
      console.error('[ArticleRepository] Error in deleteArticle:', error);
      throw error;
    }
  }
};
