<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    labels: Array,
    data: Array,
    colors: Array,
  },
  data() {
    return {
      Options: {
        legend: {
          labels: {
            fontColor: "#ffffff",
          },
        },
      },
    };
  },

  mounted() {
    this.renderChart(
      {
        labels: this.labels,

        datasets: [
          {
            label: "Cards by labels",
            backgroundColor: this.colors,

            data: this.data,
            color:"#ffffff"
          },
        ],
      },
      this.Options
    );
  },
};
</script>
