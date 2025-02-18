
// INFO : This interface defines datatypes of json data
// so that compile time type-checks pass
export class Data extends Object {
  id: string
  name: string
  description: string
  image: string
  location: string
  source: string

  constructor(id: string, name: string, description: string, image: string, location: string, source: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.location = location;
    this.source = source;
  }
}
