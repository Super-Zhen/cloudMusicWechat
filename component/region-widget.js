// pages/mine/region-widget.js
const raw = require('../apiData/area')
Component({
  options: {
    multipleSlots: true
  },
  data: {
    select:[0,0],
    region: [Object.keys(raw), raw[Object.keys(raw)[0]]],
    province:"",
    city:""
  },
  properties: {
    target: {
      type: Array,
      value: [],
      observer: 'update'
    }
  },
  methods: {
    update: function (newVal, oldVal) {
      debugger
      if(!newVal || newVal.length < 2)return;
      var province = newVal[0];
      var city = newVal[1];
      var region = this.data.region;
      //update province
      var pro_index = region[0].indexOf(province);
      if (pro_index < 0)return;
      region = [region[0], raw[province]];
      //update city
      var city_index = region[1].indexOf(city);
      if (city_index < 0) return;

      this.setData({
        select: [pro_index,city_index],
        region: region,
        province: province,
        city: city
      })
    },
    bindChange: function (e) {
      if (!e.detail.value || e.detail.value.length <2)return;
      var region = this.data.region;
      var pro_index = e.detail.value[0];
      var city_index = e.detail.value[1];
      this.setData({
        province: region[0][pro_index],
        city: region[1][city_index]
      })
      this.notify();
    },
    bindColumnChange: function (e) {
      if (e.detail.column === 0) {
        var region = this.data.region;
        var province = region[0][e.detail.value];
        this.setData({
          region: [region[0], raw[province]]
        });
      }
    },
    notify() {
      this.triggerEvent('regionChange', { province: this.data.province, city: this.data.city }, {})
    }
  }
})