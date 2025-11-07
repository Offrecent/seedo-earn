
'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Copy, Loader2, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


export default function ReferralsPage() {
    // Placeholder data
  const loading = false;
  const referralsLoading = false;
  const leaderboardLoading = false;
  const userData = { referralCode: 'john123' };
  const referrals = [
      { id: '1', username: 'jane.doe', subscription: { status: 'active' } },
      { id: '2', username: 'peter.jones', subscription: { status: 'active' } },
      { id: '3', username: 'susan.smith', subscription: { status: 'pending' } },
  ];
  const leaderboard = [
      { id: '1', username: 'TopReferrer1', referrals: { count: 50 } },
      { id: '2', username: 'SuperNetworker', referrals: { count: 45 } },
      { id: '3', username: 'john123', referrals: { count: 3 } },
  ];

  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && userData?.referralCode) {
      setReferralLink(`${window.location.origin}/register?ref=${userData.referralCode}`);
    }
  }, [userData?.referralCode]);

  const handleCopyLink = () => {
    if (referralLink) {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: 'Copied to Clipboard',
            description: 'Your referral link has been copied.',
        });
    }
  };

  const handleShare = (platform: 'whatsapp' | 'twitter') => {
    if (!referralLink) return;

    let url = '';
    const text = encodeURIComponent('Join Seedo and start earning! Use my link: ');

    if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${text}${encodeURIComponent(referralLink)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=Join%20Seedo%20and%20start%20earning!&url=${encodeURIComponent(referralLink)}`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }
  
  const sortedLeaderboard = leaderboard?.sort((a,b) => (b.referrals?.count || 0) - (a.referrals?.count || 0)).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Seedo Partner Network</h1>
            <p className="text-muted-foreground">
              Grow your network, grow your earnings.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>
                Share this link with your friends to earn bonuses.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
              <Input value={referralLink} readOnly />
              <Button onClick={handleCopyLink} disabled={!referralLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
             <Card>
                <CardHeader>
                    <CardTitle>Share on Social Media</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button variant="outline" className="w-full" onClick={() => handleShare('whatsapp')}>
                        <svg className="w-5 h-5 mr-2" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-.757-.375-1.056-.524-.297-.149-.522-.223-.672-.149-.149.074-.223.374-.298.599-.074.224-.149.448-.223.599-.075.15-.15.15-.298.075-.149-.075-.672-.224-1.27-.448-.599-.224-1.123-.523-1.572-.898-.449-.374-.823-.823-1.122-1.27-.298-.448-.597-1.047-.822-1.572-.224-.523-.448-1.122-.448-1.122s-.075-.15.075-.298c.15-.15.298-.224.448-.298.15-.075.298-.15.448-.224l.075-.074c.15-.15.224-.298.224-.523s-.074-.448-.149-.598c-.074-.15-.149-.298-.298-.448-.149-.15-.298-.224-.523-.374-.224-.149-.448-.224-.598-.224-.15 0-.298 0-.448.074-.149.075-.374.15-.523.298-.15.15-.298.299-.374.374s-.224.298-.298.448c-.075.15-.15.298-.15.374s-.075.298-.075.448v.075c0 .074.075.223.15.373.074.15.149.298.223.448.075.15.224.448.374.672.15.224.298.448.448.598.15.15.374.374.598.598.224.224.523.523.822.822.298.299.748.673 1.27.972.523.299 1.122.598 1.797.823.673.224 1.197.374 1.646.448.449.075.973.075 1.347-.075.374-.149.823-.298 1.122-.598.298-.298.522-.748.597-1.122.075-.375.075-.75 0-1.123-.074-.374-.074-.598-.149-.748-.075-.149-.149-.224-.298-.298s-.224-.15-.298-.15z"/></svg>
                        WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleShare('twitter')}>
                        <Twitter className="w-5 h-5 mr-2" />
                        Twitter
                    </Button>
                </CardContent>
             </Card>
             <Card>
                 <CardHeader>
                     <CardTitle>Top Referrer Bonus</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p>The top referrer of the week wins a bonus of <span className="font-bold text-accent">₦3,000</span>. Keep inviting to climb the leaderboard!</p>
                 </CardContent>
             </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralsLoading ? (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center"><Loader2 className="animate-spin mx-auto"/></TableCell>
                        </TableRow>
                    ) : referrals && referrals.length > 0 ? referrals.map((ref) => (
                      <TableRow key={ref.id}>
                        <TableCell className="font-medium">{ref.username}</TableCell>
                        <TableCell className="text-right">
                           <span className={`text-xs font-semibold py-1 px-2 rounded-full ${ref.subscription?.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                {ref.subscription?.status}
                            </span>
                        </TableCell>
                      </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">You haven't referred anyone yet.</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead className="text-right">Referrals</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardLoading ? (
                         <TableRow>
                            <TableCell colSpan={3} className="text-center"><Loader2 className="animate-spin mx-auto"/></TableCell>
                        </TableRow>
                    ) : sortedLeaderboard && sortedLeaderboard.length > 0 ? sortedLeaderboard.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell className="text-right font-medium">{user.referrals?.count || 0}</TableCell>
                      </TableRow>
                    )) : (
                         <TableRow>
                            <TableCell colSpan={3} className="text-center">Leaderboard is currently empty.</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

    