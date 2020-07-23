import resource from 'resource-router-middleware';
import fishes from '../models/fish';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'fish',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      let fish = fishes[id],
        err = fish ? null : 'Not found';
      callback(err, fish);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      res.json(fishes);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      fishes[`fish-${body.name}-${Date.now()}`] = body;
      res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({ fish }, res) {
      res.json(fish);
    },

    /** PUT /:id - Update a given entity */
    update({ fish, body }, res) {
      for (let key in body) {
        if (key !== 'id') {
          fish[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ fish }, res) {
      fishes.splice(fishes.indexOf(fish), 1);
      res.sendStatus(204);
    },
  });
