import { createRequestClient } from "@repo/request";
import { StatPill, WorkspaceCard } from "@repo/ui";
import { buildWorkspaceGreeting } from "@repo/utils";

const webClient = createRequestClient({
  baseURL: "/web-api"
});

const highlights = [
  {
    eyebrow: "Growth",
    title: "面向用户的主站起点",
    description: "这里适合继续接官网、营销页、内容聚合页或者业务入口，公共基础设施已经串起来了。",
    meta: webClient.buildUrl("/landing/content")
  },
  {
    eyebrow: "Delivery",
    title: "天然适合独立发布",
    description: "作为标准静态应用，后续既能上 Vercel / Netlify，也可以接对象存储加 CDN。",
    meta: "Build output: apps/web/dist"
  }
];

function App() {
  const greeting = buildWorkspaceGreeting("Web 主站");

  return (
    <main className="web-app">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Brand Site</span>
          <h1>为 Web 首页准备一个更像成品的出发点。</h1>
          <p>{greeting}</p>
        </div>

        <div className="hero-panel">
          <div className="stats-row">
            <StatPill label="Shared UI" value="Online" accent="#0f172a" />
            <StatPill label="Preset API" value="/web-api" accent="#be185d" />
          </div>
          <p className="panel-note">
            请求客户端示例地址：{webClient.buildUrl("/landing/content")}
          </p>
        </div>
      </section>

      <section className="card-grid">
        {highlights.map((item) => (
          <WorkspaceCard
            key={item.title}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
            meta={item.meta}
            accent="#be185d"
          />
        ))}
      </section>
    </main>
  );
}

export default App;
