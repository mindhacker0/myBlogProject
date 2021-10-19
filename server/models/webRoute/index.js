'use strict';

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    path:String,
    component:String,
    exact: Boolean,
	id: {type: String, unique: true},
	create_time: String,
	icon: {type: String, default: 'default.jpg'},
});

routeSchema.index({id: 1});//设置索引

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;