class API {
  apiDomain = {};
  constructor(prefix = "api") {
    this.prefix = prefix;
  }
}

function getModel(model) {
  const APImodel = `/${this.prefix}/${model}`;
  this.apiDomain[model] = APImodel;
  return APImodel;
}
const api = new API();
const getAPImodel = getModel.bind(api);

module.exports = { api, getAPImodel };
