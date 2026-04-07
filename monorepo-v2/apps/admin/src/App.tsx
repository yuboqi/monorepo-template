import { createRequestClient } from "@repo/request";
import { StatPill, WorkspaceCard } from "@repo/ui";
import { buildWorkspaceGreeting } from "@repo/utils";

const adminClient = createRequestClient({
  baseURL: "/admin-api",
  timeout: 12000
});

const modules = [
  {
    eyebrow: "Operations",
    title: "统一巡检和告警处理",
    description: "把日常运营动作聚合在一个面板里，方便继续接入权限、日志、报表和工作流。",
    meta: adminClient.buildUrl("/dashboard/summary")
  },
  {
    eyebrow: "Governance",
    title: "共享配置直接接入",
    description: "工具函数、请求配置和基础 UI 已经联通，后续业务团队可以直接在这个骨架上继续分层。",
    meta: "Ready for auth, charts and CRUD pages"
  }
];

function App() {
  const greeting = buildWorkspaceGreeting("Admin 控制台");

  return (
    <main className="admin-app">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Admin Panel</span>
          <h1>把后台系统先搭稳，再让业务长出来。</h1>
          <p>{greeting}</p>
        </div>

        <div className="hero-stats">
          <StatPill label="Workspace" value="Shared Ready" accent="#0f766e" />
          <StatPill label="Request" value="/admin-api" accent="#b45309" />
          <StatPill label="Target" value="Ops + Config" accent="#7c3aed" />
        </div>
      </section>

      <section className="card-grid">
        {modules.map((item) => (
          <WorkspaceCard
            key={item.title}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
            meta={item.meta}
            accent="#0f766e"
          />
        ))}
      </section>
    </main>
  );
}

export default App;
