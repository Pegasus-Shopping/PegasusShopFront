const request = require("supertest");
const app = require("./index");

describe("Test atelier api request functions", () => {
  test("it should get product list", async () => {
    await request(app).get("/products")
      .expect(200)
      .then((resp) => {
        expect(resp.text).toBe("[{\"id\":20100,\"campus\":\"hr-sea\",\"name\":\"Camo Onesie\",\"slogan\":\"Blend in to your crowd\",\"description\":\"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.\",\"category\":\"Jackets\",\"default_price\":\"140.00\",\"created_at\":\"2021-02-24T19:34:41.004Z\",\"updated_at\":\"2021-02-24T19:34:41.004Z\"},{\"id\":20101,\"campus\":\"hr-sea\",\"name\":\"Bright Future Sunglasses\",\"slogan\":\"You've got to wear shades\",\"description\":\"Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.\",\"category\":\"Accessories\",\"default_price\":\"69.00\",\"created_at\":\"2021-02-24T19:34:41.004Z\",\"updated_at\":\"2021-02-24T19:34:41.004Z\"},{\"id\":20102,\"campus\":\"hr-sea\",\"name\":\"Morning Joggers\",\"slogan\":\"Make yourself a morning person\",\"description\":\"Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.\",\"category\":\"Pants\",\"default_price\":\"40.00\",\"created_at\":\"2021-02-24T19:34:41.004Z\",\"updated_at\":\"2021-02-24T19:34:41.004Z\"},{\"id\":20103,\"campus\":\"hr-sea\",\"name\":\"Slacker's Slacks\",\"slogan\":\"Comfortable for everything, or nothing\",\"description\":\"I'll tell you how great they are after I nap for a bit.\",\"category\":\"Pants\",\"default_price\":\"65.00\",\"created_at\":\"2021-02-24T19:34:41.004Z\",\"updated_at\":\"2021-02-24T19:34:41.004Z\"},{\"id\":20104,\"campus\":\"hr-sea\",\"name\":\"Heir Force Ones\",\"slogan\":\"A sneaker dynasty\",\"description\":\"Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl\",\"category\":\"Kicks\",\"default_price\":\"99.00\",\"created_at\":\"2021-02-24T19:34:41.004Z\",\"updated_at\":\"2021-02-24T19:34:41.004Z\"}]");
      });
  });
});
