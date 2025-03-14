const Order = require("../models/orderModel");
const Course = require("../models/CourseModel");

const coursesCtrl = {
  addorderitems: async (req, res) => {
    const {
      orderItems,
      countryCustomer,
      paymentMethod,
      itemsPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("There is no orders");
      return;
    } else {
      const order = new Order({
        user: req.user.id,
        orderItems,
        countryCustomer,
        paymentMethod,
        itemsPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  },
  getOrderById: async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not found");
    }
  },
  updateOrderToPaid: async (req, res) => {
    const order = await Order.findById(req.params.id);
    const userid = req.query.id;
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email,
      };
      order.orderItems.forEach(async (order) => {
        const course = await Course.findById(order.course._id);
        course.students.push(userid);
        course.numStudents = course.students.length;
        await course.save();
      });
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not found");
    }
  },

  GetMyOrders: async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  },
  GetOrders: async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  },
};
module.exports = coursesCtrl;
