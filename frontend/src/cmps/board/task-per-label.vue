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
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Labels",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Tasks Count",
              },
            },
          ],
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
            label: "",
            backgroundColor: this.colors,
            data: this.data,
            fontColor: "#2C4068",
          },
        ],
      },
      this.options
    );
  },
};
</script>
