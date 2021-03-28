<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    labels: Array,
    data: Array,
    colors: Array,
    // options:Object
  },
 
  mounted() {
    this.renderChart(
      {
        labels: this.labels,

        datasets: [
          {
            label: "",
            backgroundColor: this.colors,
            // color: "#ffffff",
            data: this.data,
            borderColor: 'transparent',
            // borderColor: [
            //   "rgba(255, 99, 132, 1)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            //   "rgba(255, 159, 64, 1)",
            // ],
          },
        ],
      },
      this.options
    );
  },
};
</script>
