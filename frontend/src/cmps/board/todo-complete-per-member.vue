<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data(){
      return{
          Options:{legend:{fontColor:blue}}
      }
  },
  props: {
    labels: Array,
    data: Array,
    colors:Array
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
    }, this.Options);
  },

};
</script>
