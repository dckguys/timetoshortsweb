import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL!;

export async function POST(request: Request) {
  const body = await request.json();

  const { name, company, phone, email, category, description, has_video, budget, note } = body;

  // Supabase에 저장
  const { error } = await supabase.from("inquiries").insert({
    name,
    company,
    phone,
    email,
    category,
    description,
    has_video,
    budget,
    note: note || null,
  });

  if (error) {
    return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
  }

  // Slack 알림 전송
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "🔔 새로운 상담 문의가 접수되었습니다" },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*담당자*\n${name}` },
              { type: "mrkdwn", text: `*소속*\n${company}` },
              { type: "mrkdwn", text: `*전화*\n${phone}` },
              { type: "mrkdwn", text: `*이메일*\n${email}` },
              { type: "mrkdwn", text: `*업종*\n${category}` },
              { type: "mrkdwn", text: `*예산*\n${budget}` },
            ],
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*의뢰 내용*\n${description}` },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*영상 유무*\n${has_video}` },
              { type: "mrkdwn", text: `*기타*\n${note || "-"}` },
            ],
          },
          { type: "divider" },
        ],
      }),
    });
  } catch {
    // Slack 전송 실패해도 DB 저장은 성공했으므로 OK 반환
  }

  return NextResponse.json({ success: true });
}
