'use strict';

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    path:String,
    component:String,
    exact: Boolean,
    pid:{type: Schema.Types.ObjectId, ref: 'Route', default: null},
	create_time: String,
	icon: {type: String, default: 'default.jpg'},
    children: [{type: Schema.Types.ObjectId,ref: 'Route'}]
});

routeSchema.index({id: 1});//设置索引

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;