import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import { OK } from "../../../const.js";
import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { getListVideo } from "../../controllers/video.controller.js";

const models = initModels(sequelize);

describe("getListVideo", () => {
  let req, res, findAllStub;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    findAllStub = sinon.stub(models.video, "findAll");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("return 200 and list of video", async () => {
    const videos = [
      {
        video_id: 1,
        video_name: "Introduction to Coding",
        thumbnail: "deadpool.jpg",
        description: "Learn the basics of coding",
        views: 1500,
        source: "youtube.com",
        user_id: 1,
        type_id: 2,
      },
    ];

    findAllStub.resolves(videos);

    await getListVideo(req, res);

    expect(res.status.calledWith(OK)).to.be.true;

    expect(res.json.calledWith(videos)).to.be.true;
  });
});
