class base {
  constructor(id, createddate, updateddate) {
    this.id = id;
    this.createddate = createddate || new Date();
    this.updateddate = updateddate || new Date();
  }
}

export default base;
