const app = require('../db/app')
const request = require("supertest");
const db = require("../db/connection");
const categoryData = require("../db/data/test-data/categories");
const commentData = require('../db/data/test-data/comments');
const reviewData = require('../db/data/test-data/reviews');
const userData = require('../db/data/test-data/users');
const seed = require("../db/seeds/seed");

beforeEach(() => {
    return seed({ categoryData, commentData, reviewData, userData });
  });
  
  afterAll(() => {
    return db.end();
  });

describe("app tests", () => {
  describe("task 1 get categories", () => {
    test("status 200", () => {
        return request(app).get("/api/categories/").expect(200);
    })
    test("returns categories, containing properties of slug and description", () => {
        return request(app).get("/api/categories/").expect(200).then((response) => {
          const categoryObjs = response.body.categories;
          expect(categoryObjs).toHaveLength(4);
          categoryObjs.forEach((obj) => {
            expect.objectContaining({slug: expect.any(String), description: expect.any(String)});
            expect(obj).toHaveProperty("slug");
            expect(obj).toHaveProperty("description")
          })
        })
    })
  })
  describe("task 2 get reviews", () => {
    test("status 200", () => {
      return request(app).get("/api/reviews/").expect(200);
    })
    test("returns reviews including all properties", () => {
      return request(app).get("/api/reviews/").expect(200).then((response) => {
        const reviewObjs = response.body.reviews;
        expect(reviewObjs).toHaveLength(13);
        reviewObjs.forEach((obj) => {
          expect.objectContaining({title: expect.any(String), designer: expect.any(String), owner: expect.any(String), review_img_url: expect.any(String), review_body: expect.any(String), category: expect.any(String), created_at: expect.any(String), votes: expect.any(Number)});
          expect(obj).toHaveProperty("title");
          expect(obj).toHaveProperty("designer");
          expect(obj).toHaveProperty("owner");
          expect(obj).toHaveProperty("review_img_url");
          expect(obj).toHaveProperty("review_body");
          expect(obj).toHaveProperty("category");
          expect(obj).toHaveProperty("created_at");
          expect(obj).toHaveProperty("votes");
        })
      })
    })
  })
})
