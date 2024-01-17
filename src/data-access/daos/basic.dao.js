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

  async findOne(id) {
    return await this.model.findById(id);
  }
}
export default BasicMongoDAO;
