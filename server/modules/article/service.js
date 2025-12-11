import articleRepository from './repository.js';
import { encode, decode } from '../../utils/hashids.js';

/**
 * Article Service - Business Logic Layer untuk Article Module
 */
export default {
  /**
   * Get all articles with hashids
   */
  async getAllArticles(limit = 10, offset = 0) {
    try {
      const articles = await articleRepository.getAllArticles(limit, offset);

      // Encode article_id to hashid
      const articlesWithHashId = articles.map(article => ({
        ...article,
        id: encode(article.article_id)
      }));

      return {
        success: true,
        data: articlesWithHashId
      };
    } catch (error) {
      console.error('[ArticleService] Error in getAllArticles:', error);
      throw error;
    }
  },

  /**
   * Get latest articles (for homepage)
   */
  async getLatestArticles(limit = 6) {
    try {
      const articles = await articleRepository.getLatestArticles(limit);

      // Encode article_id to hashid
      const articlesWithHashId = articles.map(article => ({
        ...article,
        id: encode(article.article_id)
      }));

      return {
        success: true,
        data: articlesWithHashId
      };
    } catch (error) {
      console.error('[ArticleService] Error in getLatestArticles:', error);
      throw error;
    }
  },

  /**
   * Get article by hashid
   */
  async getArticleByHashId(hashId) {
    try {
      // Decode hashid to article_id
      const articleId = decode(hashId);

      if (!articleId) {
        return {
          success: false,
          message: 'Article tidak ditemukan'
        };
      }

      const article = await articleRepository.getArticleById(articleId);

      if (!article) {
        return {
          success: false,
          message: 'Article tidak ditemukan'
        };
      }

      return {
        success: true,
        data: {
          ...article,
          id: encode(article.article_id)
        }
      };
    } catch (error) {
      console.error('[ArticleService] Error in getArticleByHashId:', error);
      throw error;
    }
  },

  /**
   * Create article
   */
  async createArticle(articleData, userId) {
    try {
      const articleId = await articleRepository.createArticle(articleData, userId);

      return {
        success: true,
        message: 'Article berhasil dibuat',
        data: {
          id: encode(articleId),
          article_id: articleId
        }
      };
    } catch (error) {
      console.error('[ArticleService] Error in createArticle:', error);
      throw error;
    }
  },

  /**
   * Update article
   */
  async updateArticle(hashId, articleData, userId) {
    try {
      // Decode hashid to article_id
      const articleId = decode(hashId);

      if (!articleId) {
        return {
          success: false,
          message: 'Article tidak ditemukan'
        };
      }

      const updated = await articleRepository.updateArticle(articleId, articleData, userId);

      if (!updated) {
        return {
          success: false,
          message: 'Article tidak ditemukan atau gagal diupdate'
        };
      }

      return {
        success: true,
        message: 'Article berhasil diupdate'
      };
    } catch (error) {
      console.error('[ArticleService] Error in updateArticle:', error);
      throw error;
    }
  },

  /**
   * Delete article
   */
  async deleteArticle(hashId) {
    try {
      // Decode hashid to article_id
      const articleId = decode(hashId);

      if (!articleId) {
        return {
          success: false,
          message: 'Article tidak ditemukan'
        };
      }

      const deleted = await articleRepository.deleteArticle(articleId);

      if (!deleted) {
        return {
          success: false,
          message: 'Article tidak ditemukan atau gagal dihapus'
        };
      }

      return {
        success: true,
        message: 'Article berhasil dihapus'
      };
    } catch (error) {
      console.error('[ArticleService] Error in deleteArticle:', error);
      throw error;
    }
  }
};
