import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, LogIn } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { seo } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/auth")({
  head: () =>
    seo(
      "Entrar – EcoTech",
      "Acesse sua conta EcoTech com e-mail e senha, Google ou Lovable."
    ),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível entrar", { description: error.message });
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/" });
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível criar a conta", { description: error.message });
      return;
    }
    if (!data.session) {
      setAwaitingConfirmation(true);
      return;
    }
    toast.success("Conta criada!");
    navigate({ to: "/" });
  }

  async function handleOAuth(provider: "google" | "lovable") {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível entrar", { description: "Tente novamente em instantes." });
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  }

  if (awaitingConfirmation) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <Mail className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Confirme seu e-mail</h1>
        <p className="mt-3 text-muted-foreground">
          Enviamos um link de confirmação para <strong>{email}</strong>. Clique nele para ativar
          sua conta e depois volte para entrar.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setAwaitingConfirmation(false)}>
          Voltar
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="mb-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <Leaf className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-4 text-3xl font-semibold">Acesse o EcoTech</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entre para acompanhar o projeto. A pesquisa comunitária continua anônima.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="sr-only">Autenticação</CardTitle>
          <CardDescription className="sr-only">Entre ou crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button variant="outline" onClick={() => handleOAuth("google")}>
              <LogIn className="mr-2 h-4 w-4" aria-hidden /> Entrar com Google
            </Button>
            <Button variant="outline" onClick={() => handleOAuth("lovable")}>
              <LogIn className="mr-2 h-4 w-4" aria-hidden /> Entrar com Lovable
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-muted-foreground">ou com e-mail</span>
            <Separator className="flex-1" />
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-login">E-mail</Label>
                  <Input
                    id="email-login"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="senha-login">Senha</Label>
                  <Input
                    id="senha-login"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Entrando…" : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-cadastro">E-mail</Label>
                  <Input
                    id="email-cadastro"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="senha-cadastro">Senha</Label>
                  <Input
                    id="senha-cadastro"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres.</p>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando…" : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
