<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels: Array,
    data: Array,
    colors:Array,
    options:Object
  },
  mounted() {
    this.renderChart({
      labels: this.labels,

      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: this.colors,
          data: this.data,
        },
      ],
    }, this.options);
  },

};
</script>
