<script>
    import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
    import "@skeletonlabs/skeleton/styles/skeleton.css";
  
    export let format = "hms";
  
    let time = getTime();
  
    function getTime() {
      const now = new Date();
  
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
  
      switch (format) {
        case "hms":
          return `${hours}:${minutes}:${seconds}`;
        case "hm":
          return `${hours}:${minutes}`;
        case "ms":
          return `${minutes}:${seconds}`;
      }
    }
  
    setInterval(() => {
      time = getTime();
    }, 1000);
  </script>
  
  <div style=" padding: 5px;">
    <p>{time}</p>
  </div>
  