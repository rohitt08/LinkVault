import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, ExternalLink, Calendar, MousePointerClick, Trash2, Lock, Unlock, Clock, Eye, EyeOff, PlaySquare, Camera, Users, Link as LinkIcon, Download } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getHistory, deleteLink } from '../services/urlService';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedAlias, setCopiedAlias] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getHistory()
      .then(data => setHistory(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const copyToClipboard = async (shortUrl: string, alias: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedAlias(alias);
      setTimeout(() => setCopiedAlias(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    
    try {
      await deleteLink(id);
      setHistory(history.filter(link => link.id !== id));
      // Adjust page if we deleted the last item on the current page
      const newTotalPages = Math.ceil((history.length - 1) / 10);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Pagination Logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = history.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#F4F7F4] font-sans selection:bg-primary/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        
        {/* GLOBAL PAGE HEADER */}
        <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#111] tracking-tight mb-2">Links History</h1>
            <p className="text-muted-foreground text-lg">Manage all your shortened URLs in one place.</p>
          </div>
          <Link to="/" className="flex items-center gap-2 text-primary font-bold hover:underline bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-transform active:scale-95">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>


        {isLoading ? (
          <div className="flex justify-center items-center py-20 mb-16">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-center font-medium mb-16">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-black/5 animate-fade-in-up mb-16">
            <div className="text-5xl mb-6">🔗</div>
            <h2 className="text-2xl font-bold text-[#111] mb-2">The Vault is Empty</h2>
            <p className="text-muted-foreground font-medium mb-6">
              Shortened URLs
            </p>
            <Link to="/#url-shortener" className="inline-flex bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm">
              Create Your First Link
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden animate-fade-in-up mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="px-6 py-4 w-1/3">Original URL</th>
                    <th className="px-6 py-4">Short Link</th>
                    <th className="px-6 py-4">Advance</th>
                    <th className="px-6 py-4 text-center">Clicks</th>
                    <th className="px-6 py-4 text-right">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm bg-white">
                  {currentData.map((link) => {
                    const shortUrl = `http://localhost:8080/${link.alias}`;
                    const isPasswordVisible = visiblePasswords[link.id] || false;
                    
                    return (
                      <tr key={link.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-5 w-1/3 max-w-[200px] align-top">
                          <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium hover:text-primary transition-colors flex items-center gap-1.5 w-full">
                            <span className="truncate block">{link.originalUrl}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-primary font-semibold bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">{link.alias}</span>
                            <button
                              onClick={() => copyToClipboard(shortUrl, link.alias)}
                              className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-all active:scale-95"
                              title="Copy link"
                            >
                              {copiedAlias === link.alias ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex flex-col gap-2.5 min-w-[140px]">
                            {link.password ? (
                              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md w-max border border-amber-100">
                                {isPasswordVisible ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                {isPasswordVisible ? <span className="font-mono tracking-wide">{link.password}</span> : <span>Protected</span>}
                                <button onClick={() => togglePassword(link.id)} className="ml-1 hover:text-amber-800 transition-colors p-0.5 rounded-sm">
                                  {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400 font-medium px-2 py-1">No Password</span>
                            )}
                            
                            {link.expiresAt && (
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-max border border-blue-100" title={new Date(link.expiresAt).toLocaleString()}>
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(link.expiresAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1">
                                  ( <Clock className="w-3 h-3" />
                                  {new Date(link.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} )
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center align-top">
                          <div className="inline-flex items-center gap-1.5 text-gray-700 bg-gray-100/80 px-3 py-1 rounded-full font-semibold border border-gray-200/60">
                            <MousePointerClick className="w-3.5 h-3.5 opacity-70" />
                            {link.clicks}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right text-gray-500 align-top">
                          <div className="flex items-center justify-end gap-1.5 whitespace-nowrap font-medium">
                            <Calendar className="w-3.5 h-3.5 opacity-70" />
                            {new Date(link.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right align-top">
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95 group-hover:text-gray-400"
                            title="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                <div className="text-sm text-gray-500 font-medium">
                  Showing <span className="text-gray-900">{startIndex + 1}</span> to <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, history.length)}</span> of <span className="text-gray-900">{history.length}</span> links
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                          currentPage === i + 1 
                            ? 'bg-primary text-white shadow-sm' 
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
