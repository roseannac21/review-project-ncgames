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
        expect(reviewObjs[0]).toEqual({
          review_id: 7,
          title: 'Mollit elit qui incididunt veniam occaecat cupidatat',
          category: 'social deduction',
          designer: 'Avery Wunzboogerz',
          owner: 'mallionaire',
          review_body: 'Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.',
          review_img_url: 'https://images.pexels.com/photos/776657/pexels-photo-776657.jpeg?w=700&h=700',
          created_at: '2021-01-25T11:16:54.963Z',
          votes: 9,
          comment_count: '0'
        });
        expect(reviewObjs[12]).toEqual({
          review_id: 13,
          title: "Settlers of Catan: Don't Settle For Less",
          category: 'social deduction',
          designer: 'Klaus Teuber',
          owner: 'mallionaire',
          review_body: 'You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.',
          review_img_url: 'https://images.pexels.com/photos/1153929/pexels-photo-1153929.jpeg?w=700&h=700',
          created_at: '1970-01-10T02:08:38.400Z',
          votes: 16,
          comment_count: '0'
        })
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
          expect(obj).toHaveProperty("comment_count");
        })
      })
    })
  })
  describe("task 3 get review by id", () => {
    test("status 200", () => {
      return request(app).get("/api/reviews/5").expect(200);
    })
    test("review with id number from url is returned", () => {
      return request(app).get("/api/reviews/5/").expect(200).then((response) => {
        const reviewObj = response.body.review
        expect(reviewObj).toHaveLength(1);
        expect.objectContaining({review_id: expect(5), title: expect('Proident tempor et.'), category: expect('social deduction'), designer: expect('Seymour Buttz'), owner: expect('mallionaire'), review_body: expect('Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.'), review_img_url: expect('https://images.pexels.com/photos/209728/pexels-photo-209728.jpeg?w=700&h=700'), created_at: expect('2021-01-07T09:06:08.077Z'), votes: expect(5)})
        })
      })
    test("error handling- valid data type but review_id doesn't exist", () => {
      return request(app).get("/api/reviews/5555555/").expect(404).then(({body}) => {
        expect(body.msg).toEqual("path not found")
        })
      })
    test("error handling- invalid data type for review_id in url", () => {
      return request(app).get("/api/reviews/hello/").expect(400).then(({body}) => {
        expect(body.msg).toEqual("invalid data type")
        })
      })
    })
    
    // describe.only("task 5 post request", () => {
    //   test("status 201", () => {
    //     return request(app).post("/api/reviews/7/comments").expect(201);
    //   })
    //   test("status 201 and comment is posted with all required properties", () => {
    //     const newComment = {
    //       author: "bainesface",
    //       body: "test comment"
    //     }
    //     return request(app).post("/api/reviews/7/comments").expect(201).send(newComment).then(({body}) => {
    //       console.log(body)
    //     })
      })
//     })
// })

