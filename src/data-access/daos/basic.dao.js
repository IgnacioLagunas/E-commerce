class BasicMongoDAO {
  model;
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find();
  }

  async createOne(obj) {
    return await this.model.create(obj);
  }

  async updateOne(id, newObj) {
    return await this.model.updateOne({ _id: id }, newObj, {
      runValidators: true,
      new: true,
    });
  }

  async deleteOne(id) {
    return await this.model.deleteOne({ _id: id });
  }

  async deleteMany(query) {
    return await this.model.deleteOne({ _id: id });
  }

  async findOneById(id) {
    return await this.model.findById(id);
  }

  async findOne(query) {
    return await this.model.find(query);
  }
}
export default BasicMongoDAO;
