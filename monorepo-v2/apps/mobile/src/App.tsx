import { createRequestClient } from "@repo/request";
import { StatPill, WorkspaceCard } from "@repo/ui";
import { buildWorkspaceGreeting } from "@repo/utils";

const mobileClient = createRequestClient({
  baseURL: "/mobile-api",
  timeout: 8000
});

const mobileSections = [
  {
    eyebrow: "Mobile Feed",
    title: "H5 场景已经单独预留",
    description: "你可以继续接活动页、会员页、表单流或轻业务模块，样式和公共能力都已经拆出来了。",
    meta: mobileClient.buildUrl("/home/feed")
  },
  {
    eyebrow: "Touch Ready",
    title: "保留移动端优先的空间组织",
    description: "结构上更适合继续往底部导航、卡片流、轻交互和埋点能力扩展。",
    meta: "Viewport-first, deployable as mobile web"
  }
];

function App() {
  const greeting = buildWorkspaceGreeting("Mobile H5");

  return (
    <main className="mobile-app">
      <section className="phone-frame">
        <header className="hero">
          <span className="eyebrow">Mobile H5</span>
          <h1>把移动端入口先做成一块好用的画布。</h1>
          <p>{greeting}</p>
        </header>

        <section className="stats-strip">
          <StatPill label="Target" value="H5" accent="#2563eb" />
          <StatPill label="Preset API" value="/mobile-api" accent="#ea580c" />
        </section>

        <section className="card-stack">
          {mobileSections.map((item) => (
            <WorkspaceCard
              key={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.description}
              meta={item.meta}
              accent="#2563eb"
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
