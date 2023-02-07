import Bridge from "@/pages/bridge"
import Home from "@/pages/home"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScan from "@/pages/rollup/index"

const routes = [
  {
    name: "Portal",
    path: "/",
    fullPath: "/alpha/",
    element: <Home />,
  },
  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/alpha/bridge",
    element: <Bridge />,
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/alpha/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "RollupScanBatch",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/alpha/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "RollupScanBlock",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/alpha/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },
]

export default routes
